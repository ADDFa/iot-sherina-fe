import Chart from "chart.js/auto"
import type { ChartData, ChartDataset } from "chart.js/auto"
import { FC, useEffect, useRef } from "react"

const DriverGraph: FC<{ driverStatuses: Record<string, any>[] }> = ({
    driverStatuses
}) => {
    const driverGraph = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        let barChart: any = null

        const labels: string[] = []
        const detakJantung: number[] = []
        const blinkCount: number[] = []
        const datasets: ChartDataset[] = [
            {
                label: "Detak Jantung",
                data: detakJantung
            },
            {
                label: "Kedipan",
                data: blinkCount
            }
        ]

        driverStatuses.forEach(({ confidence, blink_count, driver }) => {
            labels.push(driver.name)
            detakJantung.push(confidence)
            blinkCount.push(blink_count)
        })

        const data: ChartData = { labels, datasets }

        async function test() {
            if (driverGraph.current) {
                barChart = new Chart(driverGraph.current, {
                    type: "bar",
                    data
                })
            }
        }

        test()

        return () => {
            if (barChart instanceof Chart) barChart.destroy()
        }
    }, [])

    return <canvas ref={driverGraph}></canvas>
}

export default DriverGraph
