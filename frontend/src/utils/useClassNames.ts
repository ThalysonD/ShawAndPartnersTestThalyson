export function classNames(...classes: (string | undefined | null | (string | undefined | null)[])[]): string {
    return classes.flat().filter(Boolean).join(' ');
}