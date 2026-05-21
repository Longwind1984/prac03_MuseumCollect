import execa from 'execa';
export declare const executeDockerRun: ({ version }: {
    version: string;
}) => Promise<execa.ExecaReturnValue<string>>;
