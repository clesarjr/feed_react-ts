import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import styles from './Post.module.css'
import { useState } from 'react'

import { Avatar } from './Avatar'
import { Comment } from './Comment'

export function Post({ author, publishedAt, content }) {
    const [comments, setComments] = useState(['Post muito bom!'])
    const [newCommentText, setNewCommentText] = useState([''])

    const publishedDateFormatted = format(new Date(publishedAt), "d 'de' LLLL 'ás' HH:mm'h'", {
        locale: ptBR,
    })
    const publishedDateRelativeToNow = formatDistanceToNow(new Date(publishedAt), {
        locale: ptBR,
        addSuffix: true,
    })

    function addComment() {
        event.preventDefault();

        const newComment = event.target.comment.value
        setComments([...comments, newComment])
        setNewCommentText('')
    }

    function deleteComment(commentToDelete) {
        const newCommentList = comments.filter(comment => {
            return comment !== commentToDelete
        })

        setComments(newCommentList)
    }

    function newCommentChange() {
        setNewCommentText(event.target.value)
    }

    const isNewCommentEmpty = newCommentText.length === 0

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} hasBorder={false} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map(item => {
                    if (item.type === 'paragraph') {
                        return <p key={item.content}>{item.content}</p>
                    }

                    if (item.type === 'link') {
                        return <p key={item.content}><a href="">{item.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={addComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea
                    name="comment"
                    placeholder="Deixe um comentário"
                    value={newCommentText}
                    onChange={newCommentChange}
                />

                <button type="submit" disabled={isNewCommentEmpty}>
                    Publicar
                </button>
            </form>

            <div className={styles.commentList}>
                {comments.map((comment, index) => {
                    return (
                        <Comment 
                            key={index}
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>
        </article>
    )
}