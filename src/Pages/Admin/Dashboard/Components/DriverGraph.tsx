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
        const spO2Data: number[] = []
        const datasets: ChartDataset[] = [
            {
                label: "Detak Jantung",
                data: detakJantung
            },
            {
                label: "Kedipan",
                data: blinkCount
            },
            {
                label: "SpO2",
                data: spO2Data
            }
        ]

        driverStatuses.forEach(({ bpm, blink_count, spO2, driver }) => {
            labels.push(driver.name)
            detakJantung.push(bpm)
            blinkCount.push(blink_count)
            spO2Data.push(spO2)
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
