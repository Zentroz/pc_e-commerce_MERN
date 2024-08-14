import UserContext from './UserContext.js'
import { useState } from 'react'

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProducts, setUserProducts] = useState(null)
  const [userPurchases, setUserPurchases] = useState(null)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider