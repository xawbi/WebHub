import React from 'react';
import {Route, Routes} from "react-router-dom";
import GithubPage from "./components/GithubPage";
import RandomizePage from "./components/RandomizePage";
import HomePage from "./components/HomePage/HomePage";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {getDesignTokens} from "./getDesignTokens";

const darkModeTheme = createTheme(getDesignTokens('dark'));

function App() {
  return (
    <ThemeProvider theme={darkModeTheme}>
      <CssBaseline />
      <Routes>
        <Route path={'/'} element={<HomePage/>}/>
        <Route path={'/GitHubSearch'} element={<GithubPage/>}/>
        <Route path={'/Randomize'} element={<RandomizePage/>}/>
      </Routes>
    </ThemeProvider>
  )
}

export default App;
