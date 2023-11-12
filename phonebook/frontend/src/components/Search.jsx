export default function Search({search, setSearch}) {
  const handleSearchChange = (event) => {
    event.preventDefault()
    setSearch(event.target.value)
  }

  return (
    <div>
      search: <input onChange={handleSearchChange} value={search}/>
    </div>
  )
}