function BoardItem({ item }) {
  return (
    <tr>
      <td>{item.boardNo}</td>
      <td>{item.title}</td>
      <td>{item.writer}</td>
      <td>{item.writeDate}</td>
      <td>{item.viewCount}</td>
    </tr>
  );
}

export default BoardItem;