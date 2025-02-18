interface ProjectListType {
  id: string;
  creator: {
    id: number;
    username: string;
    email: string;
  };
  name: string;
  color: string;
  createdAt: string;
  tag1: string;
  tag2: string;
  tag3: string;
  startDate: string;
  endDate: string;
  status: string;
  chatRoom: {
    id: number;
    name: string;
  };
  members: [
    {
      id: number;
      user: {
        id: number;
        username: string;
      };
    },
    {
      id: number;
      user: {
        id: number;
        username: string;
      };
    },
    {
      id: number;
      user: {
        id: number;
        username: string;
      };
    }
  ];
  tasks: [
    {
      id: number;
      name: string;
      status: string;
    },
    {
      id: number;
      name: string;
      status: string;
    },
    {
      id: number;
      name: string;
      status: string;
    }
  ];
}
