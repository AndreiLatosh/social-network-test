import css from './Post.module.css'

const Post = (props) => {

    return (
        <div className={css.posts}>
            <div className={css.item}>
                <img src='https://s3.cdn.teleprogramma.pro/wp-content/uploads/2020/01/a76ebd11ecf1ab90a360b056f49b90a0.jpg' />
                {props.message}
            </div>
            <div>
                <span>Like {props.likeCount}</span>
            </div>
        </div>
    );
}
export default Post;