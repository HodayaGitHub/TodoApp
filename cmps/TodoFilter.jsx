export function TodoFilter({ onSetFilter }) {
    return (
        <section className="todo-filter">
            <div className="radio-sort flex justify-center align-center">

                <label htmlFor="all">
                    {' '}
                    All <input
                        type="radio"
                        name="setReadDis"
                        value="all"
                        id="all"
                        onChange={onSetFilter} />
                    {' '}
                </label>
                <label htmlFor="done">
                    {' '}
                    Done <input
                        type="radio"
                        name="setReadDis"
                        value="done"
                        id="done"
                        onChange={onSetFilter} />
                    {' '}
                </label>
                <label htmlFor="undone">
                    {' '}
                    Active <input
                        type="radio"
                        name="setReadDis"
                        value="undone"
                        id="undone"
                        onChange={onSetFilter} />
                    {' '}
                </label>
            </div>
        </section>
    )
}
