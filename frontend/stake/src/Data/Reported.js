export const dataNeeded = [
    {
      key: 1,
      userId: 'CallMeJ',
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      type: 'Question',
      timestamp: '01/09/2024 14:12:04',
    },
    {
      key: 2,
      userId: 'Divi9',
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      type: 'Comment',
      timestamp: '01/09/2024 14:12:04',
    },
    {
      key: 3,
      userId: 'M@DDie',
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      type: 'Comment',
      timestamp: '01/09/2024 14:12:04',
    },
    {
      key: 4,
      userId: 'LucyFire',
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      type: 'Question',
      timestamp: '01/09/2024 14:12:04',
    },
    {
      key: 5,
      userId: 'MrBarton',
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      type: 'Comment',
      timestamp: '01/09/2024 14:12:04',
    },
    {
      key: 6,
      userId: 'MingCho9',
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      type: 'Comment',
      timestamp: '01/09/2024 14:12:04',
    },
    {
      key: 7,
      userId: 'CallMeJ',
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      type: 'Comment',
      timestamp: '01/09/2024 14:12:04',
    },
    {
      key: 8,
      userId: 'M@DDie',
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      type: 'Comment',
      timestamp: '01/09/2024 14:12:04',
    },
    {
      key: 9,
      userId: 'Missy',
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      type: 'Question',
      timestamp: '01/09/2024 14:12:04',
    },
    {
      key: 10,
      userId: 'Starlight',
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      type: 'Question',
      timestamp: '01/09/2024 14:12:04',
    },
    {
      key: 11,
      userId: 'SoClara',
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      type: 'Comment',
      timestamp: '01/09/2024 14:12:04',
    },
    {
      key: 12,
      userId: 'Denzil',
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      type: 'Comment',
      timestamp: '01/09/2024 14:12:04',
    },
  ];

  export const columnsNeeded = [
    {
      title: 'User ID',
      dataIndex: 'user_name',
      key: 'user_name',
      width:90,
      render: (text) => (
        <p
          style={{
            whiteSpace: 'nowrap', // Prevent text from wrapping
            overflow: 'hidden',   // Hide overflowing text
            textOverflow: 'ellipsis', // Show ellipsis for overflowing text
            maxWidth: '90px',   // Same as the column's width
          }}

        >
          {text}
        </p>
      ),
    },
    {
      title: 'Cause',
      dataIndex: 'content',
      key: 'content',
      width: 450, // Fixed width for the Activity column
      render: (text) => (
        <div className="mid">
 <p
          style={{
            whiteSpace: 'nowrap', // Prevent text from wrapping
            overflow: 'hidden',   // Hide overflowing text
            textOverflow: 'ellipsis', // Show ellipsis for overflowing text
                        }}
        >
          {text}
        </p>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width:80,
      render: (text) => (
        <p
          style={{
            whiteSpace: 'nowrap', // Prevent text from wrapping
            overflow: 'hidden',   // Hide overflowing text
            textOverflow: 'ellipsis', // Show ellipsis for overflowing text
            maxWidth: '80px',   // Same as the column's width
          }}

        >
          {text}
        </p>
      ),
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width:130,
      render: (text) => (
        <p
          style={{
            whiteSpace: 'nowrap', // Prevent text from wrapping
            overflow: 'hidden',   // Hide overflowing text
            textOverflow: 'ellipsis', // Show ellipsis for overflowing text
            maxWidth: '130px',   // Same as the column's width
          }}

        >
          {text}
        </p>
      ),
    },
  ];
