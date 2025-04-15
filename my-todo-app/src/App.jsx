import { useState } from 'react'
import './App.css'

// デフォルトで表示されているtodoList
const todoList = [
  {
    id: 1,
    title: "Todo1",
  },
  {
    id: 2,
    title: "Todo2",
  },
]

// 配列の中身の個数を定義→todoが追加される時に配列の個数を参考にid値を定義
const todoLength = todoList.length

function App() {

  // 入力中のテキストの状態管理
  const [ text, setTexts ] = useState("");
  // todoListの状態管理
  const [ todos, setTodos ] = useState(todoList);
  // todoLengthをid値として保持するための状態管理
  const [ uniqueId, setUniqueId ] = useState(todoLength);

  // 新しいtodoListを追加する処理
  const addTodoList = (todo) => {
    // スプレッド演算子で配列のインスタンスを作成してそこにtodoを追加するようにする
    // 第一引数でスプレッド演算子、第二引数で追加するtodo
    setTodos([...todos, todo]);
  }

  // 入力されたテキストから新しいtodoを作成する処理
  const newTodo = (e) => {
    // Enterがクリックかつ入力欄が空ではない時にtodoを追加する
    if (e.key === 'Enter' && text !== "") {

      // todoList用のidを生成
      const originalId = uniqueId + 1
      // 入力欄の情報から追加するtodoを生成
      const todo = {
          id: originalId,
          title: text
        };

      // 生成したtodoをtodoListに追加する処理を呼び出す
      addTodoList(todo);

      // idの状態を管理
      setUniqueId(originalId);

      // todo追加後の入力欄を空にする
      setTexts("");
    }
  }

  return (
    <>
      <div>
        <h2 className="todo_title">Reactだけでtodoリスト作成</h2>
        {/* todoListの入力欄 */}
        <input
          type='text'
          value={text}
          onChange={(e) => setTexts(e.target.value)}
          placeholder='やることを入力'
          // todoの生成とtodoListへの追加処理
          // 明示的にeの記述をしなくてもイベントハンドラでeが呼び出し先の関数に渡される
          // (e) => newTodo(e)←これはやらなくてもよい
          onKeyDown={newTodo}
        />

        {/* デフォルトのtodoListの表示 */}
        <ul>
          {todos.map(todo => {
            return <li key={todo.id}>{todo.title}</li>
          })}
        </ul>
      </div>
    </>
  )
}

export default App
