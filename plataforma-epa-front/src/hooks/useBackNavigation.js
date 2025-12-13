import { useNavigate } from 'react-router-dom';

const useBackNavigation = () => {
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate(-1);
  };

  return {
    onClickBack,
  }
};

export default useBackNavigation;