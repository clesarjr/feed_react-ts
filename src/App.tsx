import styles from './App.module.css'
import './global.css'

import { Post, PostProps } from './components/Post';
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar';

interface Posts extends PostProps {
  id: number
}

const posts: Posts[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/clesarjr.png',
      name: 'Clésar Sapelli Junior',
      role: 'Web Developer'
    },
    content: [
      { type: 'paragraph', content: 'Fala galera'},
      { type: 'paragraph', content: 'Teste conteúdo'},
      { type: 'link', content: 'link'},
    ],
    publishedAt: new Date('2023-11-17 16:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/FelipenKniess.png',
      name: 'Felipe Kanias',
      role: 'Backend Developer'
    },
    content: [
      { type: 'paragraph', content: 'Olá pessoal!'},
      { type: 'paragraph', content: 'Conteúdo 123'},
      { type: 'link', content: 'link sistema'},
    ],
    publishedAt: new Date('2023-11-12 16:00:00'),
  }
]

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post 
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}
