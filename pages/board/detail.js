import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BodyWrapper, CenterWrapper } from "../../components/styled";
import { DetailList } from "../../components/DetailList";
import { BtnItem } from "../../components/items/BtnItem";
import { detailData } from "../../util/postman";
import { useRecoilState } from "recoil";
import { displayAtom } from "../../components/items/Modal";

const detail = ({ pageProps }) => {
  const [displayFlag, setDisplayFlag] = useRecoilState(displayAtom);
  const showModal = () => {
    setDisplayFlag(true);
  };

  const { id } = pageProps;
  const [data, setData] = useState([]);
  useEffect(() => {
    // increaseCount();
    let tempRender;
    const temp = async () => {
      // setData([1]);
      tempRender = await detailData(id);
      setData(tempRender.data.detail);
    };
    temp();
  }, [id]);
  return (
    <BodyWrapper>
      <CenterWrapper>
          <DetailWrapper>
            <DetailList detailData={data} />
            <BtnItem isPwd={false} BtnName={"수정하기"} id={id}/>
          </DetailWrapper>
      </CenterWrapper>
    </BodyWrapper>
  );
};
detail.getInitialProps = (context) => {
  //SSR
  const { id } = context.query;
  return { id: id };
};

export default detail;
const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
`;