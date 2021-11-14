import React, { Component } from "react";

import JSONEditor, {JSONEditorOptions} from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";
import {EventRecordToEdit} from "../types/EventRecord";

type AppProps = {
    data: EventRecordToEdit;
    onChangeJSON: (json: any) => void;
};

export default class JSONEdit extends Component<AppProps> {
    private jsoneditor: JSONEditor | null;
    private container: HTMLElement | null;

    constructor(props: AppProps) {
        super(props);

        this.jsoneditor = null;
        this.container = null;
    }

    componentDidMount() {
        const options: JSONEditorOptions = {
            mode: "tree",
            onChangeJSON: this.props.onChangeJSON
        };

        this.jsoneditor = new JSONEditor(this.container as HTMLElement, options);
        this.jsoneditor.set(this.props.data.record);
        this.jsoneditor.expandAll();
    }

    componentWillUnmount() {
        if (this.jsoneditor) {
            this.jsoneditor.destroy();
        }
    }

    componentDidUpdate() {
        (this.jsoneditor as JSONEditor).update(this.props.data.record);
    }

    render() {
        return (
            <div ref={elem => (this.container = elem)} />
        );
    }
}
