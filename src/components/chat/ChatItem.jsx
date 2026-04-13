import React from 'react'
import './ChatItem.css';
//말풍선
function ChatItem({ user }) {
    return (
        <div className={user === 'i' ? 'c-chat-blue' : 'c-chat-black'}>
            <p className='c-chat-text'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam ratione impedit nesciunt sit autem ut quis cum laboriosam aliquid? Quaerat esse illo illum. Rerum nostrum, aliquam harum accusantium suscipit commodi.
                Nobis, error consequuntur laboriosam corrupti animi fugiat vero facere molestias magni, architecto aliquid blanditiis delectus, pariatur hic ullam natus quas aut voluptates sit nihil et. Unde maiores enim tempora expedita!
                Repellendus maxime, id distinctio architecto, iste cumque assumenda quas inventore delectus quo quaerat perferendis? Deleniti quo, rerum minima quas animi totam ut possimus architecto et qui error voluptatum dolores laudantium.
                Harum, rerum. Obcaecati, illum asperiores tempora ea quasi voluptas pariatur natus modi cumque sunt repudiandae sequi quod fuga, perspiciatis cum repellat. Sint sapiente labore delectus repellat ab officiis! Maiores, sit.</p>
            <p className='c-chat-date'>날짜</p>
        </div>
    )
}

export default ChatItem
