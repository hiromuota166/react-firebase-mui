import React from 'react'
import MatchQualifying from '../components/MatchQualifying'
import MatchFinal from '../components/MatchFinal'
import MatchSetupComponent from '../components/MatchSetupComponent'

const BoardPage = () => {
  return (
    <>
      <MatchQualifying/>
      <MatchFinal/>
      <MatchSetupComponent/>
    </>
  )
}

export default BoardPage