import React from 'react';
import styled from "styled-components"

const Transfer = () => {
    return(
        <Wrapper>
            <Amount>
                <FlexInputContainer>
                    <FlexInput placeholder="0" type="number" />
                    <span>ETH</span>
                </FlexInputContainer>
                <Warning style={{color: "" && "#0a0b0d"}}>Amount is a required field</Warning>
            </Amount>
        </Wrapper>
    )
}

export default Transfer;

const Wrapper = styled.div`
    display:flex;
    flex-direction: column;
    height: 100%;
    flex: 1;
`

const Amount = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column
`

const FlexInputContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: flex-end;

    >span{
        font-size: 3rem;
        margin-bottom: 0.5rem;
        color: #3773f5;
    }
`

const FlexInput = styled.div`
    border:none;
    background:none;
    outline: none;
    color:white;
    font-size: 1.2rem;
    test-wrap: wrap;
    text-align:right;
    max-width: 45%;
    margin-right: 1rem;
    font-size: 4.5rem;
    color: #3773f5;

    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button,
     -webkit-appearance: none;
`