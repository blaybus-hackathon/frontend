import { useState } from "react";
import api from "../api"; // axios 인스턴스 가져오기

const ApiRequestComponent = () => {
  const [endpoint, setEndpoint] = useState("");
  const [data, setData] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/api/${endpoint}`, { data });
      setResponse(res.data);
      console.log("서버 응답:", res.data);
    } catch (error) {
      console.error("API 요청 오류:", error);
      setResponse(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>엔드포인트:</label>
          <input
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="엔드포인트 입력"
          />
        </div>
        <div>
          <label>데이터:</label>
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="보낼 데이터 입력"
          />
        </div>
        <button type="submit">전송</button>
      </form>
      {response && <div>응답: {response}</div>}
    </div>
  );
};

export default ApiRequestComponent;
