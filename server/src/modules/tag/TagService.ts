import { ResponseTagDto } from "@/modules/tag/TagDto";
import TagRepository from "@/modules/tag/TagRepository";

class TagService {
  async getTags() {
    const tags = await TagRepository.getTags();
    return new ResponseTagDto(tags).tags
  }
  async getTagsBySlug(slug: string) {
    const tags = await TagRepository.getTagsBySlug(slug);
    return tags
  }
}
export default new TagService()