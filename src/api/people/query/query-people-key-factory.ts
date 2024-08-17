const peopleKeys = {
    people: ["people"],
    peopleList: () => [peopleKeys.people, "list"],
    peopleCollection: (page: number) => [peopleKeys.peopleList(), page],
    peopleDetails: (id: string) => [peopleKeys.people, id],
    peopleCredits: (id: string) => [peopleKeys.people, id, "credits"],
    peopleExternalIds: (id: string) => [peopleKeys.people, id, "external_ids"],
};

export default peopleKeys;
