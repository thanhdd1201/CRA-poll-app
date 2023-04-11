import { useAppSelector } from "../common/hooks";
import { selectUsers } from "../reducers/users";
import { User } from "../types";

const Leaderboard = () => {
  const users = useAppSelector(selectUsers);
  const usersArray = Object.values(users);
  const sortedUsers = usersArray.sort(
    (first: User, second: User) =>
      Object.keys(second.answers).length +
      second.questions.length -
      (Object.keys(first.answers).length + first.questions.length)
  );
  return (
    <>
      <div className="relative overflow-x-auto mt-10">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Users
              </th>
              <th scope="col" className="px-6 py-3">
                Answered
              </th>
              <th scope="col" className="px-6 py-3">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.length &&
              sortedUsers.map((user) => (
                <tr key={user.id} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <img
                      src={user.avatarURL}
                      className="h-10 w-10 rounded-full"
                      alt="avatar"
                    />
                    {user.name}
                  </th>
                  <td className="px-6 py-4">
                    {Object.keys(user.answers).length}
                  </td>
                  <td className="px-6 py-4">
                    {Object.keys(user.questions).length}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Leaderboard;
