export function TodoFilter({ setFilter, setSearchText }) {
    return (
        <section className="todo-filter">
            <div className="radio-sort flex justify-center align-center">
                <label>
                    Search:
                    <input
                        type="text"
                        onChange={(ev) => setSearchText(ev.target.value)}                  
                    />
                </label>
                <label htmlFor="all">
                    {' '}
                    All <input
                        type="radio"
                        name="setReadDis"
                        value="all"
                        id="all"
                        onChange={setFilter} />
                    {' '}
                </label>
                <label htmlFor="done">
                    {' '}
                    Done <input
                        type="radio"
                        name="setReadDis"
                        value="done"
                        id="done"
                        onChange={setFilter} />
                    {' '}
                </label>
                <label htmlFor="undone">
                    {' '}
                    Active <input
                        type="radio"
                        name="setReadDis"
                        value="undone"
                        id="undone"
                        onChange={setFilter} />
                    {' '}
                </label>
            </div>
        </section>
    )
}
