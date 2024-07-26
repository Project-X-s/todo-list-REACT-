import { styled } from "@mui/material";

const Home = () => {

  const StyleHome = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
    backgroundColor: '#f5f5f5',
    color: '#333',
    fontSize: '1.5rem',
    fontFamily: 'Arial, sans-serif',
  });

  return (

    <StyleHome>
      <h1>Lista de Tarefas</h1>
    </StyleHome>

  );

};

export default Home;