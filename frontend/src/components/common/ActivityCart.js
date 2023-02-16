
const ActivityCart = ({}) => {
    
    const data = {
        from: '2023-02-13',
        to: '2023-02-20',
        charts: [
            {
                time: '2023-02-16T04:00:14.824602-05:00',
                status: 'ready',
            },
            {
                time: '2023-02-16T20:00:14.824602-05:00',
                status: 'enroute',
            },
        ],
        colors: {
            enroute: 'blue',
            ready: 'red',
        }
    }
    const convert = (t1, t2) => {
        var from = new Date(data.from).getTime()
        var to = new Date(data.to).getTime()
        var t1 = new Date(t1).getTime()
        var t2 = t2 === -1 ? to : new Date(t2).getTime()
        var scale = to - from
        return {left: ((t1-from)/scale)*100, width: ((t2-t1)/scale)*100}
    }
  return (
    <div className="activity-chart">
        {
            data.charts.map((e, index) => {
                var evars = convert(e.time, index===data.charts.length-1 ? -1 : data.charts[index+1].time)
                console.log(evars)
                return <span className="chart-element" style={{background: data.colors[e.status], left:evars.left, width:evars.width}}></span>
            })
        }
    </div>

  )
}

export default ActivityCart