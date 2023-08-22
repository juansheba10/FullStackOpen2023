import React, { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))  // Inicializar votos

  const handleVote = () => {
    const newVotes = [...votes]  // Copia del estado actual de votos
    newVotes[selected] += 1     // Incrementar el voto de la anécdota actual
    setVotes(newVotes)          // Actualizar el estado de votos
  }

  const handleNext = () => {
    // Elegir una anécdota aleatoria
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  return (
    <div>
      {anecdotes[selected]}
      <div>
        has {votes[selected]} votes
      </div>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>
    </div>
  )
}

export default App;
