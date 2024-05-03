import { Tag } from "@/databases/entities/Tag";

class TagRepository {
  async getTags() {
    const tags = Tag.find();
    return tags
  }
  async getTagsBySlug(slug: string) {
    const tags = Tag.findOne({
      relations: {
        posts: true
      },
      where: {
        slug
      }
    });
    return tags
  }
}
export default new TagRepository();