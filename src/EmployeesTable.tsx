import { useQuery } from '@tanstack/react-query';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  image: string;
};

function EmployeesTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', 1],
    queryFn: () =>
      fetch('https://dummyjson.com/users?limit=10').then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="flex flex-col items-center w-full px-4 py-10 lg:px-8 lg:py-20">
      <div className="w-full max-w-5xl rounded-2xl overflow-x-auto shadow-sm border-none">
        <table className="w-full min-w-200 font-sans text-left border-collapse bg-background">
          <thead className="sr-only">
            <tr>
              <th>Select</th>
              <th>Employee</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.users.map((user: User) => {
              const isGroupA = user.id % 2 !== 0;

              const formattedDate = new Date(user.birthDate).toLocaleDateString(
                'en-US',
                {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }
              );

              return (
                <tr
                  key={user.id}
                  className="even:bg-background-secondary odd:bg-background hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 pl-6 pr-2 w-12">
                    <input
                      className="w-4 h-4 rounded border-border-color cursor-pointer accent-dark-button"
                      type="checkbox"
                    />
                  </td>

                  <td className="py-4 px-4 min-w-62.5">
                    <div className="flex items-center gap-4">
                      <img
                        className="w-11 h-11 rounded-full object-cover bg-gray-100 border border-gray-200 flex-none"
                        src={user.image}
                        alt={`${user.firstName}'s profile`}
                      />
                      <div className="flex flex-col justify-center">
                        <span className="text-base font-medium text-text leading-tight">
                          {user.firstName} {user.lastName}
                        </span>
                        <span className="text-sm font-normal text-text opacity-50 mt-0.5">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                        isGroupA ? 'bg-[#f5b85a]' : 'bg-[#9dbdf5]'
                      }`}
                    >
                      {isGroupA ? 'A' : 'B'}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-text font-normal text-sm md:text-base">
                    {formattedDate}
                  </td>

                  <td className="py-4 px-4 text-text font-normal text-sm md:text-base">
                    Jan 11, 2023
                  </td>

                  <td className="py-4 pr-6 pl-4 text-right">
                    <button className="w-8 h-8 rounded-full bg-light-button hover:bg-gray-200 text-dark-button flex items-center justify-center ml-auto transition-colors font-medium">
                      +
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeesTable;
