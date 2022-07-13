import styled from "styled-components";
const Component = styled.div`
    display: flex;
    div + div {
        margin-left: 8px;
    }
    div {
        margin-bottom: 8px;
    }
`
 const RateView =  (props: any) => {
    const {base, rates} = props
    const keys = Object.keys(rates || [])
    return <>
        <Component>
            {
                keys.map(val => val !== base && <div key={val}>
                    {base} 转 {val}:{rates[val]}
                </div>)
            }
        </Component>
    </>
}
export default RateView