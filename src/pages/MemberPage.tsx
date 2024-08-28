import { useEffect, useState } from 'react'
import supabase from '../supabase/createClient'
import { Tables } from '../types/database.types'
import PlayerCrudComponent from '../components/PlayerCrudComponent'

type typePlayers = Tables<'players'>

const MemberPage = () => {

  const [players,setPlayers] = useState<typePlayers[] | null>(null);

  const fetchPlayers = async () => {
    const { data, error } = await supabase.from('players').select('*')
    if (error) {
      console.log('Error fetching players:', error);
    } else {
      setPlayers(data);
    }
  }

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div className='flex'>
      <div>
        役割: 出場選手全員の情報を登録する画面です。 内容: 選手の名前、年齢、性別、所属チームなどの入力フォーム。
      </div>
      <div>
        役割2: 登録された選手をグループに分ける画面です。 内容: 選手をドラッグアンドドロップでグループに割り当てるインターフェース。
      </div>
      {/* {players?.map((i)=>(
        <li key={i.id}>{i.name}</li>
      ))} */}
      <PlayerCrudComponent/>
    </div>
  )
}

export default MemberPage