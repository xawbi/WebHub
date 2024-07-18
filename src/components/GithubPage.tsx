import React, {FC, memo, useCallback, useState} from 'react';
import {useLazySearchRepositoryQuery, useSearchUsersQuery} from "../store/github/github.api";
import {
  Avatar,
  Box,
  Card,
  Chip,
  ClickAwayListener,
  TextField,
  Typography
} from "@mui/material";
import {useDebounce} from "../hooks/hooks";
import {IUser} from "../models/models";
import ButtonBack from "../ButtonBack";

const GithubPage: FC = memo(() => {

  const [githubValue, setGithubValue] = useState<string>('')
  const [chipClicked, setChipClicked] = useState(false);
  const debounce = useDebounce(githubValue)
  const {isLoading: loadingGithubLoginData, data: githubLoginData} = useSearchUsersQuery(debounce, {
    skip: debounce.length < 2
  })
  const [fetchRepos, {isLoading: repositoriesLoading, data: repositoriesData}] = useLazySearchRepositoryQuery()

  const handleChipClick = useCallback((user: IUser) => {
    setChipClicked(() => true)
    fetchRepos(user.login)
  }, [])

  return (
    <>
      <ButtonBack/>
      <Box sx={{textAlign: 'center'}}>
        <Typography sx={{marginTop: 10, marginBottom: 2, fontSize: 20}}>Find your github repository</Typography>
        <TextField
          onKeyDown={() => setChipClicked(false)}
          hiddenLabel
          variant="filled"
          size="small"
          sx={{input: {background: '#090A34'}, marginBottom: 1, border: '1px solid grey'}}
          value={githubValue}
          onChange={e => setGithubValue(e.target.value)}
        />
        {chipClicked
          ? <>
            {repositoriesLoading
              ? <div>Loading...</div>
              :
              <div style={{marginTop: '15px'}}>
              {repositoriesData && repositoriesData.map(repo =>
              <div key={repo.id}>
                <Card variant="outlined" sx={{width: 400, margin: 0.5, display: 'inline-block'}}>
                  <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>
                    {repo.name}
                  </Typography>
                  <Typography sx={{ fontSize: 18, textAlign: 'left' }} gutterBottom>
                    link: <a target="_blank" href={`${repo.html_url}`}>{repo.html_url}</a>
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} component="div">
                    watchers: {repo.watchers}
                  </Typography>
                </Card>
              </div>
            )}</div>}
          </>
          : <>
            {loadingGithubLoginData
              ? <div>Loading...</div>
              : <>
                {githubLoginData !== undefined && debounce.length > 1 && githubLoginData.map((user: IUser) =>
                  <div key={user.id}>
                    <ClickAwayListener onClickAway={() => setChipClicked(false)}>
                      <Chip
                        size="medium"
                        onClick={() => handleChipClick(user)}
                        sx={{
                          fontSize: '1rem', height: 48,
                          borderRadius: 24, margin: 0.5,
                        }}
                        avatar={<Avatar sx={{width: 48, height: 48}} alt="Natacha" src={`${user.avatar_url}`}/>}
                        label={`${user.login}`}
                        variant="outlined"
                      />
                    </ClickAwayListener>
                  </div>
                )}
              </>}
          </>
        }
      </Box>
    </>
  )
})

export default GithubPage;