const { createClass, PropTypes } = React;
const { createStore } = Redux;
const { Provider } = ReactRedux;

function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([action.text])
        default:
            return state
    }
}

const Item = (props) => (
    <h1>Hello, {props.name} by {props.author}</h1>
)

const ItemList = (props) => {
    return (
        <div className="itemList">
            {props.itemList.map(item => (
                <Item name={item.text} author={item.author} />
            ))}
        </div>
    )
}

const ListBox = createClass({
    contextTypes: {
        store: PropTypes.object
    },
    componentDidMount() {
        const { store } = this.context;
        this.unsubscribe = store.subscribe( () => this.forceUpdate() )
    },
    componentWillUnmount() {
        this.unsubscribe();
    },
    render() {
        const items = this.context.store.getState();
        
        return (
            <div className="listBox">
                <h1>items</h1>
                <ItemList itemList={ items } />                
            </div>
        );
    }
});

let store = createStore(todos, [{ text: "Simple Text", author: 'None' }])

store.dispatch({
    type: 'ADD_TODO',
    text: { text: 'Read the docs', author: 'Mauricio' }
})

ReactDOM.render(
    <Provider store={ store }>
        <ListBox />
    </Provider>,
    document.querySelector('#content')
);
