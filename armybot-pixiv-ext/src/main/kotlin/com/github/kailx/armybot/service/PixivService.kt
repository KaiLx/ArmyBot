package com.github.kailx.armybot.service

import com.github.kailx.armybot.model.pixiv.Illustration
import org.jsoup.Jsoup
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.RequestEntity
import org.springframework.stereotype.Service
import org.springframework.util.LinkedMultiValueMap
import java.net.URI

typealias RequestBody = LinkedMultiValueMap<String, String>

/**
 * @author KaiLx
 */
@Service
class PixivService(val restTemplateBuilder: RestTemplateBuilder) {
    fun getNewlyArrivedIllustration(): List<Illustration> {
//        val restTemplate = restTemplateBuilder.build()
//        val forObject = restTemplate.getForObject("https://www.google.co.jp/", String::class.java)
        createRequestForLogin().let { login(it) }
        TODO()
    }

    fun login(request: RequestEntity<*>) {
        val restTemplate = restTemplateBuilder.build()
        val response = restTemplate.exchange(request, String::class.java)
        takeIf { !response.statusCode.is2xxSuccessful } ?: error("")
    }

    private fun createRequestForLogin(): RequestEntity<*> {
        val restTemplate = restTemplateBuilder.build()
        val request = RequestEntity.get(URI("https://accounts.pixiv.net/login")).build()
        val response = restTemplate.exchange(request, String::class.java)
        val cookies = response.headers[HttpHeaders.SET_COOKIE]?.toTypedArray()

        val loginPage = Jsoup.parse(response.body)
        val postKey = loginPage.getElementsByAttributeValue("name", "post_key")?.let {
            it.`val`()
        }

        return RequestEntity.post(URI("https://accounts.pixiv.net/api/login?lang=ja"))
                .header(HttpHeaders.CONTENT_TYPE, "${MediaType.APPLICATION_FORM_URLENCODED_VALUE}; charset=${Charsets.UTF_8.name()}")
                .header(HttpHeaders.SET_COOKIE, *cookies!!)
                .header(HttpHeaders.REFERER, "https://accounts.pixiv.net/login?lang=ja&source=pc&view_type=page&ref=wwwtop_accounts_index")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .acceptCharset(Charsets.UTF_8)
                .body(
                        LinkedMultiValueMap<String, String>().apply {
                            add("pixiv_id", "kxb3317")
                            add("password", "genki3317")
//                            add("captcha", "")
//                            add("g_recaptcha_response", "")
                            add("post_key", postKey)
                            add("source", "pc")
                            add("ref", "wwwtop_accounts_index")
                            add("return_to", "https://www.pixiv.net/")
                        }
                )
    }
}