import { startTransition, useMemo, useState } from 'react'
import { faker } from '@faker-js/faker'

const generateNames = () => {
  const names = [] as String[]
  for (let index = 0; index < 10000; index++) {
    names.push(faker.name.fullName())
  }
  return names
}

function App() {
 const [inputWithTransition,setInput] = useState("")

 const names = useMemo(() => {
    return generateNames()
 }, [])

 const [filterNames, setFilterNames] = useState(names)

 const [inputWithoutTransition,setInputWithoutTransition] = useState("")
 const [filterNamesWithoutTransition, setFilterNamesWithoutTransition] = useState(names)

  const handleInputChangeWithOutTransition = async (e: any) => {
    setInputWithoutTransition(e.target.value)
    setFilterNamesWithoutTransition(old => names.filter(el => el.includes(e.target.value)))
  }
 

 const handleInputChangeWithTransition = async (e: any) => {
    setInput(e.target.value)

    startTransition(() => {
      setFilterNames(old => names.filter(el => el.includes(e.target.value)))
    })
 }
  return (
    <>
    <div style={{display: 'flex', justifyContent:"space-between"}}>
      <div>
        <input type="text" value={inputWithTransition} onChange={handleInputChangeWithTransition} />
        {filterNames.map((name,i) => {
          return (
            <div>{name}</div>
          )
        })}
      </div>
      <div>
        <input type="text" value={inputWithoutTransition} onChange={handleInputChangeWithOutTransition} />
        {filterNamesWithoutTransition.map((name,i) => {
          return (
            <div key={ i}>{name}</div>
          )
        })}
      </div>
    </div>
    </>
  )
}

export default App
