import React, {memo, useCallback, useEffect, useState} from 'react';
import ButtonBack from "../ButtonBack";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {useTheme} from "@mui/system"
import SaveIcon from '@mui/icons-material/Save'

interface IMassGridAndTextField {
  id: number
  func: (e: string) => void
  label: string
  value: string
  text: string
  align: string
  error: boolean
}

const RandomizePage = memo(() => {

  const theme = useTheme()
  const [number1, setNumber1] = useState<string>('')
  const [number2, setNumber2] = useState<string>('')
  const [quantity, setQuantity] = useState<string>('1')
  const [errorNumber1, setErrorNumber1] = useState<boolean>(false)
  const [errorNumber2, setErrorNumber2] = useState<boolean>(false)
  const [errorQuantity, setErrorQuantity] = useState<boolean>(false)
  const [inputId, setInputId] = useState<number | undefined>(undefined)
  const [inputOnFocus, setInputOnFocus] = useState<boolean>(false)
  const [massSize, setMassSize] = useState<number[]>([4, 6, 8, 10])
  const [randomNumberMass, setRandomNumberMass] = useState<number[]>([])
  const [clickThreeNumber, setClickThreeNumber] = useState<number[]>([])

  const massGridAndTextField: IMassGridAndTextField[] = [
    {id: 1, func: (e) => setNumber1(e), label: 'Number 1', value: number1, text: 'max: +- 2147483647', align: 'right', error: errorNumber1},
    {id: 2, func: (e) => setNumber2(e), label: 'Number 2', value: number2, text: 'max: +- 2147483647', align: 'center', error: errorNumber2},
    {id: 3, func: (e) => setQuantity(e), label: 'Quantity', value: quantity, text: 'max: 10000', align: 'left', error: errorQuantity},
  ]

  const calculateGridSize = useCallback(() => {
    const massSize2 = [2, 4, 6, 8]
    const massSize3 = [2, 2, 4, 6]
    const massSize4 = [2, 2, 3, 4]
    const massSize5 = [1, 2, 2, 3]
    if ((clickThreeNumber[1] >= 10000 || -clickThreeNumber[0] >= 10000) && (clickThreeNumber[1] < 100000 && -clickThreeNumber[0] < 100000)) {
      setMassSize([...massSize2])
    } else if ((clickThreeNumber[1] >= 100000 || -clickThreeNumber[0] >= 100000) && (clickThreeNumber[1] < 10000000 && -clickThreeNumber[0] < 10000000)) {
      setMassSize([...massSize3])
    } else if ((clickThreeNumber[1] >= 10000000 || -clickThreeNumber[0] >= 10000000) && (clickThreeNumber[1] < 1000000000 && -clickThreeNumber[0] < 1000000000)) {
      setMassSize([...massSize4])
    } else if ((clickThreeNumber[1] >= 1000000000 || -clickThreeNumber[0] >= 1000000000)) {
      setMassSize([...massSize5])
    } else return undefined
  }, [clickThreeNumber])

  useEffect(() => {
    calculateGridSize()
  }, [calculateGridSize])

  const clickCalculate = () => {
    let isError: boolean = false
    if (number1.length == 0 || +number1 > 2147483647 || +number1 < -2147483647) {
      setErrorNumber1(true)
      setRandomNumberMass([])
      isError = true
    }
    if (number2.length == 0 || +number2 > 2147483647 || +number2 < -2147483647) {
      setErrorNumber2(true)
      setRandomNumberMass([])
      isError = true
    }
    if (quantity.length == 0 || +quantity > 10000 || +quantity < 1) {
      setErrorQuantity(true)
      setRandomNumberMass([])
      isError = true
    }
    if (+number1 > +number2) {
      setErrorNumber1(true)
      setErrorNumber2(true)
      setRandomNumberMass([])
      isError = true
    }
    if (isError) return
    setClickThreeNumber([+number1, +number2, +quantity])
    setErrorNumber1(false)
    setErrorNumber2(false)
    setErrorQuantity(false)
  }

  const getRandomInt = useCallback(() => {
    const massRandomNum: number[] = []
    const min = Math.ceil(clickThreeNumber[0])
    const max = Math.floor(clickThreeNumber[1])
    for (let i = 0; i < clickThreeNumber[2]; i++) {
      massRandomNum.push(Math.floor(Math.random() * (max - min + 1)) + min)
    }
    setRandomNumberMass(massRandomNum)
  }, [clickThreeNumber])

  useEffect(() => {
    getRandomInt()
  }, [getRandomInt])

  const getOnFocusId = (id: number) => {
    setInputOnFocus(true)
    setInputId(id)
  }

  const downloadFile = () => {
    const fileContent = randomNumberMass.join('\n');
    const blob = new Blob([fileContent], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const file = new File([blob], 'file.txt', {type: 'text/plain'});
    const link = document.createElement('a')
    link.href = URL.createObjectURL(file)
    link.download = 'file.txt'
    document.body.appendChild(link)
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, id: number, func: (e: string) => void, value: string) => {
    func(e.target.value)
    let text: string = e.target.value
    let quantityText: string | false = inputId === 3 ? e.target.value : '1'
    if (inputId === 1 && +text > 2147483647 || +text < -2147483647 || text.length === 0) {
      setErrorNumber1(true)
    } else setErrorNumber1(false)
    if (inputId === 2 && +text > 2147483647 || +text < -2147483647 || text.length === 0) {
      setErrorNumber2(true)
    } else setErrorNumber2(false)
    if (inputId === 3 && +quantityText > 10000 || +quantityText < 1) {
      setErrorQuantity(true)
    } else setErrorQuantity(false)
  }

  return (
    <>
      <ButtonBack/>
      <Box sx={{textAlign: 'center', margin: '50px 10% 0 10%'}}>
        <Typography sx={{marginTop: 10, marginBottom: 5, fontSize: 20}}>Randomize</Typography>
        <Grid container justifyContent='center' style={{width: '100%'}}>
          {massGridAndTextField.map((obj: IMassGridAndTextField) =>
            <>
              <Grid key={obj.id} item xs={12} sm={6} md={4} lg={4} sx={{textAlign: obj.align,
                [theme.breakpoints.down('md')]: {textAlign: 'center'}
              }}>
                <Box sx={{textAlign: 'left', display: 'inline-block', marginBottom: 1}}>
                  <TextField
                    error={obj.error}
                    onFocus={() => getOnFocusId(obj.id)}
                    onBlur={() => setInputOnFocus(false)}
                    id={`${obj.id}`}
                    label={`${obj.label}`}
                    type="number"
                    value={obj.value}
                    onChange={e => handleChange(e, obj.id, obj.func, obj.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    sx={{input: {background: '#090A34', borderRadius: '5px 5px 0 0'}}}
                  />
                  {inputOnFocus && (obj.id === inputId) ?
                    <Typography sx={{fontSize: '12px', color: obj.error ? 'red' : '#9E9E9E'}}>{obj.text}</Typography>
                    : <Typography sx={{userSelect: 'none'}}>ㅤ</Typography>
                  }
                </Box>
              </Grid>
            </>
          )}
        </Grid>
        <Button onClick={clickCalculate} sx={{margin: '20px 0', color: '#737DFF', border: '1px solid #737DFF'}}
                variant="text">calculate</Button>
        <Grid container justifyContent='center'
              columns={{xs: massSize[0], sm: massSize[1], md: massSize[2], lg: massSize[3]}}
              style={{width: '100%', padding: '0 30%'}}
        >
          {randomNumberMass && randomNumberMass.map((randNum) =>
            <Grid xs={1} item sx={{padding: '10px'}}>{randNum}</Grid>
          )}
        </Grid>
        {randomNumberMass.length > 0 &&
          <Button color="secondary" startIcon={<SaveIcon sx={{marginBottom: 0.5}}/>}
                  size={"small"} onClick={downloadFile} sx={{margin: '20px 0', color: '#737DFF'}}
                  variant="text">save file with numbers</Button
          >}
      </Box>
    </>)
})

export default RandomizePage;