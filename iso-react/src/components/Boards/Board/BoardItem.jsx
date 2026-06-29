function BoardItem({ board }) {
  return (
    <tr>
      <td>{board.no}</td>
      <td>{board.title}</td>
      <td>{board.writer}</td>
      <td>{board.date}</td>
      <td>{board.views}</td>
    </tr>
  );
}

export default BoardItem;