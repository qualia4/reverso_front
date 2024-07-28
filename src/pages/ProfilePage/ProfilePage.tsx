import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../../MyContext';
import { playService } from '../../api/playService';
import { getStatsService } from '../../api/getStatsService';
import { waitingForPlayerService } from '../../api/waitingForPlayerService';
import { PageContainer } from '../../components/PageContainer/PageContainer';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { ActionButton } from '../../components/ActionButton/ActionButton';
import { Modal } from '../../components/Modal/Modal';
import { StatisticsDisplay } from '../../components/StatisticsDisplay/StatisticsDisplay';
import { ProfileLoader} from "../../components/ProfileLoader/ProfileLoader";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { jsonData, updateJsonData } = useMyContext();
  const username = jsonData?.usernameJSON;
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    draws: 0,
    gamesWon: 0,
    gamesLost: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!username) {
      navigate('/');
    }
  }, [username, navigate]);

  const handlePlayClick = async (gameType: string) => {
    setLoading(true);
    try {
      const data = await playService(username, gameType);
      updateJsonData({ lobbyIDJSON: data.lobbyId, usernameJSON: username });
      if (data.gameStarted) {
        setLoading(false);
        navigate('/game');
      } else {
        await waitingForPlayerService(data.lobbyId);
        setLoading(false);
        navigate('/game');
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleShowStatsClick = async () => {
    setLoading(true);
    try {
      const stats = await getStatsService(username);
      setStats(stats);
      setShowStatsModal(true);
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
    }
    setLoading(false);
  };

  return (
      <PageContainer>
        <PageTitle title="Main Menu" />
        <ActionButton onClick={() => handlePlayClick('pvp')}>Play PvP</ActionButton>
        <ActionButton onClick={() => handlePlayClick('pve')}>Play PvE</ActionButton>
        <ActionButton onClick={() => handlePlayClick('pvmm')}>Play Minimax PvE</ActionButton>
        <ActionButton onClick={handleShowStatsClick}>Show Stats</ActionButton>

        <Modal isOpen={showStatsModal} onClose={() => setShowStatsModal(false)}>
          <StatisticsDisplay username={username} stats={stats} />
          <ActionButton onClick={() => setShowStatsModal(false)}>OK</ActionButton>
        </Modal>

        {loading && <ProfileLoader />}
      </PageContainer>
  );
};

export default ProfilePage;
