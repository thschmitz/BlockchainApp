import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import {BsThreeDotsVertical} from "react-icons/bs"
import { coins } from '../static/coins';
import Coin from "./Coin"
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const Portfolio = ({thirdWebTokens, sanityTokens, walletAddress}) => {

    const [walletBalance, setWalletBalance] = useState(" Searching...")
    const [walletToken, setWalletToken] = useState();
    const [walletName, setWalletName] = useState()
    const tokenToUSD = {}

    for (const token of sanityTokens) {
        tokenToUSD[token.contractAddress] = Number(token.usdPrice)
    }

    // convert all of my tokens into USD

    useEffect (() => {

        const calculateTotalBalance = async() => {
            const totalBalance = await Promise.all(
                thirdWebTokens.map(async token => {
                    const balance = await token.balanceOf(walletAddress);
                    return Number(balance.displayValue) * tokenToUSD[token.address]
                })
            )
            console.log("Total Balance: ", totalBalance)
            setWalletBalance(totalBalance.reduce((acc, curr) => acc + curr, 0))
        }
        const getBalance = async() => {
            console.log("sanityTokens", sanityTokens)
            console.log("thirdWebTokens", thirdWebTokens)
            const totalToken = await Promise.all(
                thirdWebTokens.map(async token => {
                    const balance = await token.balanceOf(walletAddress)
                    return Number(balance.displayValue)
                })
            )
            const totalName = await Promise.all(
                sanityTokens.map(async token => {
                    return token.name
                })
            )

            setWalletName(totalName)
            console.log("Total Name: ", totalName)
            
            console.log("Total Token: ", totalToken)
            setWalletToken(totalToken)
        }


        getBalance()


        return calculateTotalBalance()
    }, [thirdWebTokens])

    const state = {


        labels: walletName,
        
        datasets: [
            {
            label: 'CryptoCoins',
            backgroundColor: '#3773f5',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: walletToken
            }
        ]

      }

    return  (
        <Wrapper>
            <Content>
                <Graph>
                    <div>
                        <Balance>
                            <BalanceTitle>Portfolio Balance</BalanceTitle>
                            <BalanceValue>
                                {"$"}
                                {walletBalance.toLocaleString()}
                            </BalanceValue>
                        </Balance>
                    </div>
                    <Bar
                        data={state}
                        options={{
                            title:{
                            display:true,
                            text:'Average Rainfall per month',
                            fontSize:20
                            },
                            legend:{
                            display:true,
                            position:'right'
                            }
                        }}
                    />
                </Graph>
                <PortfolioTable>
                    <TableItem>
                        <TitleAssets>Your Assets</TitleAssets>
                    </TableItem>
                    <Divider />
                    <Table>
                        <TableItem>
                            <TableRow>
                                <div style= {{flex: 3}}>Name</div>
                                <div style= {{flex: 2}}>Balance</div>
                                <div style= {{flex: 1}}>Price</div>
                                <div style= {{flex: 1}}>Allocation</div>
                                <div style= {{flex: 0}}><BsThreeDotsVertical/></div>
                            </TableRow>
                        </TableItem>
                        <Divider />
                        <div>{coins.map(coin => (
                            <div>
                                <Coin coin={coin}/>
                                <Divider />
                            </div>
                        ))}
                        </div>
                    </Table>
                </PortfolioTable>
            </Content>
        </Wrapper>

    )
}

export default Portfolio


const Wrapper = styled.div`
    flex: 1;
    display:flex;
    justify-content: center;
`

const Graph = styled.div`
    border: 1px solid #282b2f;
    padding: 1rem 2rem;
`

const Content = styled.div`
    width: 100%;
    max-width: 1000px;
    padding: 2rem 1rem;
`

const Balance = styled.div`
`

const BalanceTitle = styled.div`
    color: #8a919e;
    font-size: 0.9rem;
`

const BalanceValue = styled.div`
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0.5rem 0;
`

const PortfolioTable = styled.div`
    margin-top: 1rem;
    border: 1px solid #282b2f;
`

const Table = styled.table`
    width: 100%;
`

const TableRow = styled.tr`
    width: 100%;
    display:flex;
    justify-content: space-between;

    >th {
        text-align: left;
    }
`

const TableItem = styled.div`
    padding: 1rem 2rem;
`

const Divider = styled.div`
    border-bottom: 1px solid #282b2f
`

const TitleAssets = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
`