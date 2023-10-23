/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import wordList from './words'
import { FaWordpress } from 'react-icons/fa'
import { BiSolidRightArrow } from 'react-icons/bi'
import { motion, AnimatePresence } from 'framer-motion'
import animations from './assets/motions'

const API = {
  INITIAL_BOARD: Array(6).fill('')

}
function Row ({ row, rowIndex, currentRow, word, children }) {
  return (
    // render 5 element per row
    <div className='flex items-center '>
      {children}
      {Array(5).fill(null).map((e, index) => {
        console.log(row[index])
        return (
          <div
            // setting the color if the element match the same index in the winner word or if the element is included in the winner word
            style={currentRow !== rowIndex && currentRow >= rowIndex
              ? { background: word[index] === row[index] ? 'rgb(22 163 74)' : word.split('').includes(row[index]) ? 'rgb(235, 90, 23)' : '', transition: 'all 1s' }
              : {}}
            className={'test relative border-2 p-8 grid place-items-center border-slate-500'} key={index}>
            <AnimatePresence>
           { row[index] && row[index] !== '' && <motion.p {...animations.scaleAnimationFromRightBottom(0)} className='absolute text-3xl uppercase font-bold   '>{row[index] ?? ''}</motion.p> }
           </AnimatePresence>
          </div>
        )
      })
      }
    </div>
  )
}

function App () {
  const [word, setWord] = useState(wordList[Math.floor(Math.random() * wordList.length)])
  const [board, setBoard] = useState(API.INITIAL_BOARD)
  const [currentRow, setCurrentRow] = useState(0)
  const [gameOver, setGameOver] = useState('')

  console.log(word)
  useEffect(() => {
    //  if the game is already over we return
    if (gameOver) {
      setTimeout(() => {
        document.querySelector('#play-again').focus()
      }, 300)

      return
    }

    function addLetter (e) {
      // check for a winner
      if (board[currentRow] === word) {
        setGameOver('won')
        return
      }
      // these will be the allowed input keys for the user besides enter and backspace
      const allowKeys = 'qwertyuiopasdfghjklñzxcvbnm'
      const keyPressed = e.key.toLowerCase()
      if (!allowKeys.split('').includes(keyPressed) && keyPressed !== 'enter' && keyPressed !== 'backspace') return
      setBoard(board => {
        const newBoard = [...board]
        // if we press enter in the last leter of the word we change the current row
        if (keyPressed === 'enter' && newBoard[currentRow].length === 5) {
          // also we check if we are in the last row to set game over
          if (currentRow === 5) setGameOver('lost')

          setCurrentRow(old => old + 1)
          return newBoard
        }
        // we add a letter to our word if the key pressed is not backspace or enter
        if (newBoard[currentRow].split('').length < 5 && keyPressed !== 'backspace' && keyPressed !== 'enter') {
          newBoard[currentRow] += keyPressed
        }
        // if we pressed backspace we slice the current array (word) , removing the last index
        if (keyPressed === 'backspace') newBoard[currentRow] = newBoard[currentRow].slice(0, -1)

        return newBoard
      })
    }
    // in order to add a the keyboard functionality we add a keydown event listener
    window.addEventListener('keydown', addLetter)
    return () => window.removeEventListener('keydown', addLetter)
  }, [board, currentRow, gameOver])

  // similar functionalities but instead of pressing "enter" now this is when we click the Check Button
  function handleCheck () {
    // checking for a winner
    if (board[currentRow] === word) {
      setGameOver('won')
      return
    }
    // if there is no winner and board is full we set game over
    if (board[currentRow].length === 5) {
      if (currentRow === 5) {
        setGameOver('lost')
        return
      }
      setCurrentRow(old => old + 1)
    }
  }
  // we reset all our states in order to start a new game
  function handlePlayAgain () {
    setCurrentRow(0)
    setBoard(API.INITIAL_BOARD)
    setGameOver('')
    setWord(wordList[Math.floor(Math.random() * wordList.length)])
  }

  function handleWebsiteKeyBoard (e) {
    const keyPressed = e.currentTarget.dataset.value.toLowerCase()
    console.log(keyPressed)
    setBoard(board => {
      const newBoard = [...board]
      // if we press enter in the last leter of the word we change the current row
      if (keyPressed === 'enter' && newBoard[currentRow].length === 5) {
        // also we check if we are in the last row to set game over
        if (currentRow === 5) setGameOver('lost')

        setCurrentRow(old => old + 1)
        return newBoard
      }
      // we add a letter to our word if the key pressed is not backspace or enter
      if (newBoard[currentRow].split('').length < 5 && keyPressed !== '<' && keyPressed !== 'enter') {
        newBoard[currentRow] += keyPressed
      }
      // if we pressed backspace we slice the current array (word) , removing the last index
      if (keyPressed === '<') newBoard[currentRow] = newBoard[currentRow].slice(0, -1)

      return newBoard
    })
  }

  return (
    <>
      <header className="flex gap-2 justify-center items-center h-20 bg-slate-900">
        <h1 className="text-3xl  font-bold">My Wordle</h1>
        <FaWordpress className='w-10 h-10'></FaWordpress>
      </header>
      <main style={gameOver ? { opacity: '0.5' } : {}} className='lg:grid grid-cols-2 mt-20 flex  flex-wrap justify-center ' >
        {/* HOW TO PLAY  SECTION */}
        <section className='hidden  lg:flex flex-col self-start justify-self-center '>
          <h1 className='text-3xl font-bold'>How To Play</h1>
          <h3 className='text-xl'>Guess the Word in 6 tries.</h3>
          <ul className='list-disc max-w-[400px] mt-4'>
              <li className=''>Each guess must be 5-letter word.</li>
              <li>The color of the tiles will change to show how close your guess was to the word.</li>
              <li>You can use your keyboard on pc or the one we provided.</li>
              <li>There is no going back after submitting a word , so think carefully before pressing &quot;Enter&quot;</li>
          </ul>
          {/* EXAMPLES */}
          <h4 className='font-bold mt-4 text-lg'>Examples</h4>
          <div className='flex mt-4 '>
              {'world'.split('').map((e, index) => <div className={`grid place-items-center border border-slate-400 p-4  w-14 h-14 ${index === 2 && 'bg-green-600'}`} key={index}>
                <span className='absolute uppercase font-bold text-xl'>{e}</span>
                </div>) }
          </div>
          <p className='mt-2'><strong>R </strong>is in the word and in the correct spot.</p>
          <div className='flex mt-4 '>
              {'smart'.split('').map((e, index) => <div className={`grid place-items-center border border-slate-400 p-4  w-14 h-14 ${index === 0 && 'bg-orange-500'}`} key={index}>
                <span className='absolute uppercase font-bold text-xl'>{e}</span>
                </div>) }
          </div>
          <p className='mt-2'><strong>S </strong>is in the word but in the wrong spot.</p>
        </section>
        {/* GAME SECTION */}
        <section className='flex flex-col justify-center items-center  self-start justify-self-start select-none'>
        {board?.map((e, index) =>
        <Row key={index} word={word} row={e} currentRow={currentRow} rowIndex={index} >
          {currentRow === index &&
          <motion.div className='flex items-center justify-center' {...animations.loopArrowAnimationHorizontal()}>
             <BiSolidRightArrow className='absolute ml-[-50px] text-slate-300 w-10 h-10' />
          </motion.div> }
        </Row>)}
        {/* KEYBOARD */}
        <div style={{ pointerEvents: gameOver ? 'none' : 'auto' }} className='grid grid-cols-10 mt-10  gap-1 relative '>
          {'qwertyuiopasdfghjkl<zxcvbnm'.split('').map((e) =>
           <button disabled={gameOver} data-value={e} onClick={handleWebsiteKeyBoard}
          className='keyboard-key border-2 border-blue-200 px-3 py-2 grid w-12 h-12 place-items-center  bg-slate-500 text-black font-extrabold hover:bg-slate-600 hover:cursor-pointer  active:scale-95'
          key={e}><span className='text-xl absolute uppercase'>{e}</span>
          </button>) }
          <button disabled={gameOver} onClick={handleCheck} className='keyboard-key border-blue-200 capitalize text-xl right-0 bottom-0 absolute px-[47px] py-[8px] border-2  bg-slate-500 text-black font-extrabold hover:bg-slate-600 active:scale-95'>Enter</button>
        </div>
        </section>
      </main>
      {/* GAME OVER CONTAINER */}
      <AnimatePresence>
      {gameOver &&
          <motion.div {...animations.scaleAnimationCenterExitCenter()} className='absolute border-2 border-blue-200 w-60 h-44  p-2 inset-0 m-auto bg-slate-800 flex flex-col items-center justify-evenly' >
            <h1 className='text-xl font-bold'>You have {gameOver}</h1>
            <p>The word is : <span className='text-green-500 font-bold '>{word}</span></p>
            <button id='play-again' className='px-4 py-2 bg-green-600 font-bold hover:bg-green-400 active:scale-95 focus:outline-none' onClick={handlePlayAgain}>Play again</button>
          </motion.div>
        }
        </AnimatePresence>

    </>
  )
}
export default App
