import './App.css'

function App() {

  return (
    <div className={'page'}>
        <h1>Movie search</h1>
        <header>
            <form action="#" className={'form'}>
                <input type="search" placeholder={'Avengers, Star Wars, The Matrix...'}/>
                <button type={'submit'}>Search</button>
            </form>
        </header>
        <main>
            The results will appear here.
        </main>
    </div>
  )
}

export default App
