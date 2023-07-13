const API_END_POINT = "https://todo-api.roto.codes/jeongwuk";

export const request = async (url, options) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, options);

    if (!res.ok) {
      throw new Error("데이터 요청에 실패하였습니다.");
    }
    return await res.json();
  } catch (e) {
    throw new Error("데이터 요청에 실패하였습니다.");
  }
};
