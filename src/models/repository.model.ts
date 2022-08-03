export class Repository {
  name: string;
  link: string;

  constructor(rawRepository: any) {
    this.name = rawRepository.package.name
    this.link = rawRepository.package.links.npm
  }
}
