const peopleKeys = {
  people: ["people"],
  peopleList: () => [peopleKeys.people, "list"],
  peopleCollection: (page: number) => [peopleKeys.peopleList(), page],
};

export default peopleKeys;
