import './ProblemSet.css';
import { Link } from 'react-router';

function getProblems() {
  return [
    { id: 1, title: "HCPC 팀 짜기", author: "robert334", result: "ac" },
    { id: 2, title: "흑백조경사", author: "myyh1234", result: "no" },
    { id: 3, title: "아무나 풀어주세요", author: "thak00", result: "no" },
    { id: 4, title: "순열 복원", author: "paull04", result: "ac" },
    { id: 5, title: "수열과 쿼리 HY", author: "myyh1234", result: "wa" },
    { id: 6, title: "수수수수퍼노바", author: "ramzxc", result: "ac" },
    { id: 7, title: "돌 게임 nm", author: "paull04", result: "ac" },
    { id: 8, title: "덧셈 팰린드롬 수열과 트리", author: "thak00", result: "no" },
    { id: 9, title: "나연 정렬", author: "myyh1234", result: "wa" },
    { id: 10, title: "간선을 하나 그어서 루트까지 거리의 합을 최소로 만들기로 했습니다", author: "paull04", result: "no" }
  ]; // result: no / ac / wa
}

export default function ProblemSet() {

  const Problems = getProblems();

  const ProblemBoxList = Problems.map((x) => <Problem info={x} key={x.id}/>);

  return (
    <main>
      {ProblemBoxList}
    </main>
  );
}

function Problem({ info }) {
  return (
    <div className={`problem ${info.result}`}>
      <span className="problemID">{'#' + info.id}</span>
      <Link to={'/problem/' + info.id} className="problemTitle">{info.title}</Link>
      <Link to={'/user/' + info.author} className="problemAuthor">{'@' + info.author}</Link>
    </div>
  );
}