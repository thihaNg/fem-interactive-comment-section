import React, { useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import CommentRow from './features/comment-section/components/CommentRow';
import CommentInput from './features/comment-section/components/CommentInput';
import { CurrentUserContext, CommentsContext, CommentsDispatchContext } from './features/comment-section/AppContext';
import { AppState, appReducer } from './features/comment-section/AppReducer';
import initialData from './assets/data.json'
import { CommentSection } from './features/comment-section';

function App() {

  const initialState: AppState = {
    currentUser: initialData.currentUser,
    comments: initialData.comments
  }

  const [appState, dispatch] = useReducer(appReducer, initialState)

  return (
    <CurrentUserContext.Provider value={appState.currentUser}>
      <CommentsContext.Provider value={appState.comments}>
        <CommentsDispatchContext.Provider value={dispatch}>
          <div
            className='App'>
            {/* <h4
              className='header'>Comments Section</h4> */}
            <CommentSection />
          </div>
        </CommentsDispatchContext.Provider>
      </CommentsContext.Provider>
    </CurrentUserContext.Provider>
  )
}

export default App;
