interface ILaunchRequestArgs extends DebugProtocol.LaunchRequestArguments {
    cwd: string;
    runtimeArguments?: string[];
    runtimeExecutable?: string;
    file?: string;
    url?: string;
    stopOnEntry?: boolean;
    sourceMaps?: boolean;
    outDir?: string;
    port?: number;
    diagnosticLogging?: boolean;
}

interface IAttachRequestArgs extends DebugProtocol.AttachRequestArguments {
    cwd: string;
    port: number;
    address: string;
    sourceMaps?: boolean;
    outDir?: string;
    diagnosticLogging?: boolean;
}

interface ISetBreakpointsArgs extends DebugProtocol.SetBreakpointsArguments {
    /** DebugProtocol does not send cols, maybe it will someday, but this is used internally when a location is sourcemapped */
    cols?: number[];
}

/*
 * The ResponseBody interfaces are copied from debugProtocol.d.ts which defines these inline in the Response interfaces.
 * They should always match those interfaces, see the original for comments.
 */
interface SetBreakpointsResponseBody {
    breakpoints: DebugProtocol.Breakpoint[];
}

interface SourceResponseBody {
    content: string;
}

interface ThreadsResponseBody {
    threads: DebugProtocol.Thread[];
}

interface StackTraceResponseBody {
    stackFrames: DebugProtocol.StackFrame[];
}

interface ScopesResponseBody {
    scopes: DebugProtocol.Scope[];
}

interface VariablesResponseBody {
    variables: DebugProtocol.Variable[];
}

interface EvaluateResponseBody {
    result: string;
    variablesReference: number;
}

declare type PromiseOrNot<T> = T | Promise<T>;
interface IDebugAdapter {
    registerEventHandler(eventHandler: (event: DebugProtocol.Event) => void): void;

    initialize(args: DebugProtocol.InitializeRequestArguments): PromiseOrNot<void>;
    launch(args: ILaunchRequestArgs): PromiseOrNot<void>;
    disconnect(): PromiseOrNot<void>;
    attach(args: IAttachRequestArgs): PromiseOrNot<void>;
    setBreakpoints(args: DebugProtocol.SetBreakpointsArguments): PromiseOrNot<SetBreakpointsResponseBody>;
    setExceptionBreakpoints(args: DebugProtocol.SetExceptionBreakpointsArguments): PromiseOrNot<void>;

    continue(): PromiseOrNot<void>;
    next(): PromiseOrNot<void>;
    stepIn(): PromiseOrNot<void>;
    stepOut(): PromiseOrNot<void>;
    pause(): PromiseOrNot<void>;

    stackTrace(args: DebugProtocol.StackTraceArguments): PromiseOrNot<StackTraceResponseBody>;
    scopes(args: DebugProtocol.ScopesArguments): PromiseOrNot<ScopesResponseBody>;
    variables(args: DebugProtocol.VariablesArguments): PromiseOrNot<VariablesResponseBody>;
    source(args: DebugProtocol.SourceArguments): PromiseOrNot<SourceResponseBody>;
    threads(): PromiseOrNot<ThreadsResponseBody>;
    evaluate(args: DebugProtocol.EvaluateArguments): PromiseOrNot<EvaluateResponseBody>;
}

interface IDebugTransformer {
    initialize?(args: DebugProtocol.InitializeRequestArguments, requestSeq?: number): PromiseOrNot<void>;
    launch?(args: ILaunchRequestArgs, requestSeq?: number): PromiseOrNot<void>;
    attach?(args: IAttachRequestArgs, requestSeq?: number): PromiseOrNot<void>;
    setBreakpoints?(args: DebugProtocol.SetBreakpointsArguments, requestSeq?: number): PromiseOrNot<void>;
    setExceptionBreakpoints?(args: DebugProtocol.SetExceptionBreakpointsArguments, requestSeq?: number): PromiseOrNot<void>;

    stackTrace?(args: DebugProtocol.StackTraceArguments, requestSeq?: number): PromiseOrNot<void>;
    scopes?(args: DebugProtocol.ScopesArguments, requestSeq?: number): PromiseOrNot<void>;
    variables?(args: DebugProtocol.VariablesArguments, requestSeq?: number): PromiseOrNot<void>;
    source?(args: DebugProtocol.SourceArguments, requestSeq?: number): PromiseOrNot<void>;
    evaluate?(args: DebugProtocol.EvaluateArguments, requestSeq?: number): PromiseOrNot<void>;

    setBreakpointsResponse?(response: SetBreakpointsResponseBody, requestSeq?: number): PromiseOrNot<void>;
    stackTraceResponse?(response: StackTraceResponseBody, requestSeq?: number): PromiseOrNot<void>;
    scopesResponse?(response: ScopesResponseBody, requestSeq?: number): PromiseOrNot<void>;
    variablesResponse?(response: VariablesResponseBody, requestSeq?: number): PromiseOrNot<void>;
    sourceResponse?(response: SourceResponseBody, requestSeq?: number): PromiseOrNot<void>;
    threadsResponse?(response: ThreadsResponseBody, requestSeq?: number): PromiseOrNot<void>;
    evaluateResponse?(response: EvaluateResponseBody, requestSeq?: number): PromiseOrNot<void>;

    scriptParsed?(event: DebugProtocol.Event);
}
