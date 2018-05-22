export class FilesToArrayValueConverter {
    toView(fileList: FileList) {
        if (!fileList) {
            return [];
        }
        let files: any[] = [];
        for (let i = 0; i < fileList.length; i++) {
                files.push(fileList.item(i));
        }
        return files;
    }
}