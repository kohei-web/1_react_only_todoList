import { useState, useMemo } from 'react';
import './App.css'
/* styles */
import styles from "./style.module.css";

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

  // todoListの状態管理
  const [ todos, setTodos ] = useState(todoList);
  // 入力中のテキストの状態管理
  const [ text, setTexts ] = useState("");
  // todoLengthをid値として保持するための状態管理
  const [ uniqueId, setUniqueId ] = useState(todoLength);
  // 検索キーワードの状態管理
  const [ searchText, setSearchText ] = useState("");


  // 新しいtodoListを追加する処理
  const addTodoList = (todo) => {
    // スプレッド演算子で配列のインスタンスを作成してそこにtodoを追加するようにする
    // 第一引数でスプレッド演算子、第二引数で追加するtodo
    setTodos([...todos, todo]);
  }

  // 入力されたテキストから新しいtodoを作成する処理
  const newTodo = (e) => {
    // IME変換確定中（日本語入力中）ならスルー
    if (e.isComposing) return;

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

  // 検索処理後のtodoListを自動的に作成
  const filteredTodos = useMemo(() => {
    // フィルタリング処理に該当したtodoだけを抜き取って新しい配列として作成して返す
    return todos.filter((todo) => {
      // javascript標準正規表現用のオブジェクトRegExpを使用
      // ^:前方一致
      // i:大文字小文字は無視
      const regexp = new RegExp("^" + searchText, "i")
      // todoの配列のtitleにmatch(reaExp(正規表現))したものだけ返す
      return todo.title.match(regexp)
    });

    // useMemoはいずれかの値が変更された時にtodos, searchTextの値を使用して第一引数の関数を再計算する処理
  }, [todos, searchText]);

  // 削除処理関数
  // 現在のtodoListと一致するidをtodoListから除外して新しい配列を作成して表示させる
  const handleDeleteTodo = (targetId) => {
    // 除外して新しい配列を作るから一致しないものを新しい配列として作成
    const newTodoList = todos.filter((todo) => todo.id !== targetId)

    setTodos(newTodoList);
  };

  return (
    <>
      <div>
        <h2 className="todo_title">Reactだけでtodoリスト作成</h2>
        {/* todoListの入力欄 */}
        <input
          type='text'
          // 入力中のテキスト：useStateで状態管理している
          value={text}
          onChange={(e) => setTexts(e.target.value)}
          placeholder='やることを入力'
          // todoの生成とtodoListへの追加処理
          // 明示的にeの記述をしなくてもイベントハンドラでeが呼び出し先の関数に渡される
          // (e) => newTodo(e)←これはやらなくてもよい
          onKeyUp={newTodo}
        />

        {/* 検索用キーワード欄 */}
        <input
          type='text'
          value={searchText}
          placeholder='検索キーワード'
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* デフォルトのtodoListの表示 */}
        <ul>
          {filteredTodos.map(todo => {
            return (
              <li className={styles.list} key={todo.id}>
                <span>{todo.title}</span>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className={styles.deleteButton}
                >
                  削除ボタン
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default App
