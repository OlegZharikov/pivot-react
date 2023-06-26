"use client"
import * as React from 'react';
import ToggleSwitch from '@/UIElements/ToggleSwitch';
import * as FlexmonsterReact from 'react-flexmonster';
import 'flexmonster';

class UsingAPICalls extends React.Component<any, {}> {

    private pivotRef: React.RefObject<FlexmonsterReact.Pivot> = React.createRef<FlexmonsterReact.Pivot>();
    private flexmonster!: Flexmonster.Pivot;

    componentDidMount() {
        this.flexmonster = this.pivotRef.current!.flexmonster;
    }

    controllGridCharts = (isGrid: boolean) => {
        isGrid ? this.showGrid() : this.showChart();
    }

    controllInteractiveness = (isInteractive: boolean) => {
        isInteractive ? this.interactive() : this.readOnly()
    }

    showChart = () => {
        this.flexmonster.showCharts("column");
    }

    showGrid = () => {
        this.flexmonster.showGrid();
    }

    readOnly = () => {
        this.flexmonster.setOptions({
            readOnly: true
        });
        this.flexmonster.refresh();
    }

    interactive = () => {
        this.flexmonster.setOptions({
            readOnly: false
        });
        this.flexmonster.refresh();
    }

    hideContextMenu = () => {
        this.flexmonster.customizeContextMenu(() => {
            return [];
        });
    }

    showContextMenu = () => {
        this.flexmonster.customizeContextMenu(null as any);
    }

    render() {
        return (
            <>
                <h1 className="page-title">Using Flexmonster API calls</h1>

                <div className="description-blocks first-description-block">
                    <p>
                        Flexmonster provides <a href="https://www.flexmonster.com/api/methods/?r=rm_react" target="_blank" rel="noopener noreferrer" className="title-link">API calls</a> for
                        interacting with the component.
                        As an example, we've added the toggle buttons below. Use them to switch between the views or make Flexmonster read-only.
                    </p>
                </div>

                <div className="description-blocks">
                    <ToggleSwitch triggerFunction={this.controllGridCharts} labelChecked="Grid" labelUnChecked="Column chart" />
                    <ToggleSwitch triggerFunction={this.controllInteractiveness} labelChecked="Interactive" labelUnChecked="Read-only" />
                </div>

                <FlexmonsterReact.Pivot
                    ref={this.pivotRef}
                    toolbar={true}
                    beforetoolbarcreated={toolbar => {
                        toolbar.showShareReportTab = true;
                    }}
                    shareReportConnection={{
                        url: "https://olap.flexmonster.com:9500"
                    }}
                    width="100%"
                    height={600}
                    componentFolder="https://cdn.flexmonster.com/"
                    report="https://cdn.flexmonster.com/github/demo-report.json"
                    //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                />
            </>
        );
    }

}

export default UsingAPICalls;