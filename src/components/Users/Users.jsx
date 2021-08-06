import Paginator from '../common/Paginator/Paginator';
import User from './User';

const Users = ({ users, currentPage, totalUsersCount, pageSize, onPageChanged, ...props }) => {
    return (
        <div>
            <Paginator
                currentPage={currentPage}
                totalIemsCount={totalUsersCount}
                pageSize={pageSize}
                onPageChanged={onPageChanged}
            />
            <div>
                {users.map(u =>
                    <User
                        user={u}
                        key={u.id}
                        followingInProgress={props.followingInProgress}
                        follow={props.follow}
                        unfollow={props.unfollow}
                    />)}
            </div>
        </div>
    )
}

export default Users;